import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TimePicker } from './time-picker'

const meta = {
  title: 'Organisms/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  args: { date: undefined, onChange: () => {} }
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const TwentyFourHour: Story = {
  name: '24-hour',
  render: function Render() {
    const [date, setDate] = useState<Date>(new Date())
    return <TimePicker date={date} onChange={setDate} />
  }
}

export const TwelveHourWithSeconds: Story = {
  name: '12-hour + seconds',
  render: function Render() {
    const [date, setDate] = useState<Date>(new Date())
    return <TimePicker date={date} onChange={setDate} hourFormat="12" showSeconds />
  }
}
