import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Calendar } from './calendar'

const meta = {
  title: 'Organisms/Calendar',
  component: Calendar,
  tags: ['autodocs']
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    )
  }
}

export const WithMonthYearDropdowns: Story = {
  name: 'Month/year navigation (MUI-style)',
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        startMonth={new Date(1950, 0)}
        endMonth={new Date(2050, 11)}
        className="rounded-md border"
      />
    )
  }
}

export const Range: Story = {
  render: function Render() {
    const [range, setRange] = useState<
      { from: Date | undefined; to?: Date | undefined } | undefined
    >()
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        captionLayout="dropdown"
        className="rounded-md border"
      />
    )
  }
}
