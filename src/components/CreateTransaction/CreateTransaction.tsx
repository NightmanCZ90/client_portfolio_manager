import { CircularProgress, debounce, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ToggleButtonGroup } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { CustomToggleButton, PrimaryButton } from '../../constants/components';
import { createTransactionFormSchema } from '../../constants/validations';
import { useCreateTransaction } from '../../hooks/transactions';
import { ExecutionType, Transaction, TransactionType } from '../../types/transaction';
import { Currency, CurrencyProps } from '../../types/utility';
import { StyledCreateTransaction } from './CreateTransaction.styles'

const initialFormData = {
  stockName: '',
  stockSector: '',
  transactionTime: new Date().toISOString().slice(0, 10),
  transactionType: TransactionType.Buy,
  numShares: '',
  price: '',
  currency: Currency.USD,
  execution: ExecutionType.FIFO,
  commissions: '',
  notes: '',
}

type FormData = {
  stockName: string;
  stockSector: string;
  transactionTime: string;
  transactionType: TransactionType;
  numShares: string;
  price: string;
  currency: Currency;
  execution: ExecutionType;
  commissions: string;
  notes: string;
}

const initialFormDataErrors = {
  stockName: '',
  stockSector: '',
  transactionTime: '',
  transactionType: '',
  numShares: '',
  price: '',
  currency: '',
  execution: '',
  commissions: '',
  notes: '',
}

const executionTypes = {
  fifo: 'FIFO', // First In First Out
  lifo: 'LIFO', // Last In First Out
  weightedAverage: 'Weighted average',
  specificLots: 'Specific lots',
  highCost: 'High cost',
  lowCost: 'Low cost',
}

interface CreateTransactionProps {
  portfolioId: number;
  transaction?: Transaction;
}

const validation = (value: any, name: CurrencyProps, setErrors: any, isNumericInput: boolean, ) => createTransactionFormSchema(name)
  .validate({ [name]: value })
    .then((value) => {
      setErrors('')
    })
    .catch((err) => {
      setErrors(err.message);
      if (isNumericInput && value === '') {
        setErrors('');
      }
    });

const CreateTransaction: React.FC<CreateTransactionProps> = (props) => {
  const { mutate: createTransaction, isLoading, error, isSuccess } = useCreateTransaction(props.portfolioId);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formDataErrors, setFormDataErrors] = useState<typeof initialFormDataErrors>(initialFormDataErrors);

  const { portfolioId, transaction } = props;

  const isEdit = Boolean(transaction);

  const debouncedValidation = useMemo(() => debounce(validation, 250), []);

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        stockSector: transaction.stockSector || '',
        transactionTime: new Date(transaction.transactionTime).toISOString().slice(0, 10),
        numShares: transaction.numShares.toString(),
        price: transaction.price.toString(),
        commissions: transaction.commissions?.toString() || '',
        notes: transaction.notes || '',
      });
    }
  }, [transaction]);

  useEffect(() => {
    if (isSuccess) setFormData(initialFormData);
  }, [isSuccess]);

  const handleTransactionTypeSelection = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: TransactionType) => {

    setFormData({
      ...formData,
      transactionType: value,
    });
  }

  const handleCurrencySelection = (event: SelectChangeEvent<Currency>) => {
    setFormData({
      ...formData,
      currency: event.target.value as Currency,
    });
  }

  const handleExecutionSelection = (event: SelectChangeEvent<ExecutionType>) => {
    setFormData({
      ...formData,
      execution: event.target.value as ExecutionType,
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const isNumericInput = event.target.name === 'numShares' || event.target.name === 'price' || event.target.name === 'commissions';

    const setErrors = (value: any) => {
      setFormDataErrors({ ...formDataErrors, [event.target.name]: value });
    }

    debouncedValidation(event.target.value, event.target.name as CurrencyProps, setErrors, isNumericInput);

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const { stockName, stockSector, transactionTime, numShares, price, commissions, notes } = formDataErrors;
  const isFormDataInvalid = Boolean(stockName) || Boolean(stockSector) || Boolean(transactionTime) || Boolean(numShares) || Boolean(price) || Boolean(commissions) || Boolean(notes);

  const isDisabled = !formData.stockName || !formData.numShares || !formData.price || isFormDataInvalid || isLoading;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isDisabled || !portfolioId) {
      return;
    }

    createTransaction({ ...formData, portfolioId: Number(portfolioId) });
  }

  return (
    <StyledCreateTransaction>

      <form onSubmit={handleSubmit}>
        <div className="transaction-type">
          <ToggleButtonGroup
            color="primary"
            value={formData.transactionType}
            exclusive
            onChange={handleTransactionTypeSelection}
          >
            <CustomToggleButton value={TransactionType.Buy}>Buy</CustomToggleButton>
            <CustomToggleButton value={TransactionType.Sell}>Sell</CustomToggleButton>
            <CustomToggleButton disabled value={TransactionType.BuyToCover}>Buy to cover</CustomToggleButton>
            <CustomToggleButton disabled value={TransactionType.DRIP}>Drip</CustomToggleButton>
            <CustomToggleButton disabled value={TransactionType.Dividends}>Dividends</CustomToggleButton>
            <CustomToggleButton disabled value={TransactionType.Split}>Split</CustomToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="required">
          {/* TODO: Implement search to find stock symbol after API service implementation */}
          <TextField
            required
            id="stock-name-input"
            label="Stock symbol"
            name="stockName"
            value={formData.stockName}
            error={Boolean(formDataErrors.stockName)}
            helperText={formDataErrors.stockName}
            onChange={handleChange}
          />
          <TextField
            required
            id="transaction-time-input"
            label="Transaction time"
            type="date"
            name="transactionTime"
            value={formData.transactionTime}
            error={Boolean(formDataErrors.transactionTime)}
            helperText={formDataErrors.transactionTime}
            onChange={handleChange}
          />
          <TextField
            required
            id="shares-number-input"
            label="Share amount"
            type="number"
            name="numShares"
            inputProps={{ min: 0, step: 0.0001 }}
            value={formData.numShares}
            error={Boolean(formDataErrors.numShares)}
            helperText={formDataErrors.numShares}
            onChange={handleChange}
          />
          <TextField
            required
            id="stock-price-input"
            label="Stock price"
            type="number"
            name="price"
            inputProps={{ min: 0, step: 0.0001 }}
            value={formData.price}
            error={Boolean(formDataErrors.price)}
            helperText={formDataErrors.price}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel id="stock-currency">Currency</InputLabel>
            <Select
              labelId="currency"
              id="stock-currency-input"
              value={formData.currency}
              label="Currency"
              onChange={handleCurrencySelection}
            >
              <MenuItem value={Currency.USD}>
                {Currency.USD}
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="defaulted">
          <TextField
            id="stock-sector-input"
            label="Sector"
            name="stockSector"
            value={formData.stockSector}
            error={Boolean(formDataErrors.stockSector)}
            helperText={formDataErrors.stockSector}
            onChange={handleChange}
          />
          <TextField
            id="transaction-commissions-input"
            label="Commissions"
            type="number"
            name="commissions"
            inputProps={{ min: 0, step: 0.01 }}
            value={formData.commissions}
            error={Boolean(formDataErrors.commissions)}
            helperText={formDataErrors.commissions}
            onChange={handleChange}
          />
          {formData.transactionType === TransactionType.Sell ? (
            <FormControl required={formData.transactionType === TransactionType.Sell}>
              <InputLabel id="execution-type">Execution</InputLabel>
              <Select
                labelId="execution-type"
                id="stock-execution-type-input"
                value={formData.execution}
                label="Execution"
                onChange={handleExecutionSelection}
              >
                <MenuItem value={ExecutionType.FIFO}>
                  {executionTypes[ExecutionType.FIFO]}
                </MenuItem>
                <MenuItem value={ExecutionType.LIFO}>
                  {executionTypes[ExecutionType.LIFO]}
                </MenuItem>
                <MenuItem value={ExecutionType.WeightedAverage}>
                  {executionTypes[ExecutionType.WeightedAverage]}
                </MenuItem>
                <MenuItem value={ExecutionType.SpecificLots}>
                  {executionTypes[ExecutionType.SpecificLots]}
                </MenuItem>
                <MenuItem value={ExecutionType.HighCost}>
                  {executionTypes[ExecutionType.HighCost]}
                </MenuItem>
                <MenuItem value={ExecutionType.LowCost}>
                  {executionTypes[ExecutionType.LowCost]}
                </MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </div>
        <TextField
          fullWidth
          multiline
          id="transaction-notes-input"
          label="Notes"
          name="notes"
          value={formData.notes}
          error={Boolean(formDataErrors.notes)}
          helperText={formDataErrors.notes}
          onChange={handleChange}
        />

        <PrimaryButton
          type="submit"
          disabled={isDisabled}
        >
          {isLoading ? (<CircularProgress size={24} />) : "Create Transaction"}
        </PrimaryButton>

        {error && <span>{error.message}</span>}
      </form>

    </StyledCreateTransaction>
  )
}

export default CreateTransaction;
