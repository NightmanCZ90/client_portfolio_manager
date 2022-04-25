import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

import { CustomToggleButton, PrimaryButton } from '../../constants/components';
import { createTransactionFormSchema } from '../../constants/validations';
import { ExecutionType, TransactionType } from '../../types/transaction';
import { StyledCreateTransaction } from './CreateTransaction.styles'

const initialFormData = {
  symbol: '',
  sector: '',
  time: new Date().toISOString().slice(0, 10),
  type: TransactionType.Buy,
  numShares: 1, // 0.01
  price: 1, // 0.0001
  currency: 'USD',
  execution: ExecutionType.FIFO,
  commissions: 0,
  notes: '',
}

type FormData = {
  symbol: string;
  sector: string | null;
  time: string;
  type: TransactionType;
  numShares: number;
  price: number;
  currency: string;
  execution: ExecutionType;
  commissions: number | null;
  notes: string | null;
}

const initialFormDataErrors = {
  symbol: '',
  sector: '',
  time: '',
  type: '',
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
}

const CreateTransaction: React.FC<CreateTransactionProps> = (props) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formDataErrors, setFormDataErrors] = useState<typeof initialFormDataErrors>(initialFormDataErrors);

  const handleTransactionTypeSelection = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: TransactionType) => {

    setFormData({
      ...formData,
      type: value,
    });
  }

  const handleExecutionSelection = (event: SelectChangeEvent<ExecutionType>) => {
    setFormData({
      ...formData,
      execution: event.target.value as ExecutionType,
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

    // TODO: Implement validation
    createTransactionFormSchema(event.target.name).validate({ [event.target.name]: event.target.value })
    .then((value) => {
      setFormDataErrors({ ...formDataErrors, [event.target.name]: '' });
    })
    .catch((err) => {
      setFormDataErrors({ ...formDataErrors, [event.target.name]: err.message });
      if ((event.target.name === 'numShares' || event.target.name === 'price' || event.target.name === 'commissions') && event.target.value === '') {
        setFormDataErrors({ ...formDataErrors, [event.target.name]: '' });
      }
    });

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = () => {

  }

  return (
    <StyledCreateTransaction>

      <form onSubmit={handleSubmit}>
        <div className="transaction-type">
          <ToggleButtonGroup
            color="primary"
            value={formData.type}
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
            id="stock-symbol-input"
            label="Stock symbol"
            name="symbol"
            value={formData.symbol}
            error={Boolean(formDataErrors.symbol)}
            helperText={formDataErrors.symbol}
            onChange={handleChange}
          />
          <TextField
            required
            id="transaction-time-input"
            label="Transaction time"
            type="date"
            name="time"
            value={formData.time}
            error={Boolean(formDataErrors.time)}
            helperText={formDataErrors.time}
            onChange={handleChange}
          />
          <TextField
            required
            id="shares-number-input"
            label="Share amount"
            type="number"
            name="numShares"
            inputProps={{ min: 0 }}
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
            inputProps={{ min: 0 }}
            value={formData.price}
            error={Boolean(formDataErrors.price)}
            helperText={formDataErrors.price}
            onChange={handleChange}
          />
          <TextField
            required
            id="stock-currency-input"
            label="Currency"
            name="currency"
            value={formData.currency}
            error={Boolean(formDataErrors.currency)}
            helperText={formDataErrors.currency}
            onChange={handleChange}
          />
        </div>

        <div className="defaulted">
          <TextField
            id="transaction-commissions-input"
            label="Commissions"
            type="number"
            name="commissions"
            value={formData.commissions}
            error={Boolean(formDataErrors.commissions)}
            helperText={formDataErrors.commissions}
            onChange={handleChange}
          />
          {formData.type === TransactionType.Sell ? (
            <FormControl required={formData.type === TransactionType.Sell}>
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

        <PrimaryButton type="submit">
          Create Transaction
        </PrimaryButton>
      </form>

    </StyledCreateTransaction>
  )
}

export default CreateTransaction;
