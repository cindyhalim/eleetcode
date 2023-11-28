'use client'

import { useContext, useState } from 'react'

import Button from '@/app/components/Button'
import Drawer from '@/app/components/Drawer'
import Toggle from '@/app/components/Toggle'
import { DrawerContext } from '@/app/context/DrawerContext'
import LocalStorage, { TimerSettings } from '@/app/context/LocalStorage'

type SettingsInputProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

function SettingsInput({
  label,
  id,
  value,
  onChange,
  disabled = false,
}: SettingsInputProps) {
  return (
    <div className={`flex items-center justify-between py-2`}>
      <label htmlFor={id}>{label}</label>
      <input
        required
        disabled={disabled}
        maxLength={3}
        min={0}
        type="number"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[80px] bg-gray-50 border border-gray-300 text-gray-800 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-600"
      />
    </div>
  )
}

export default function SettingsDrawer() {
  const { isOpen, closeDrawer } = useContext(DrawerContext)
  const timerSettings = LocalStorage.getTimerSettings()
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(
    timerSettings?.enabled || false
  )
  const [easyDuration, setEasyDuration] = useState<string>(
    `${timerSettings?.easy}`
  )
  const [mediumDuration, setMediumDuration] = useState<string>(
    `${timerSettings?.medium}`
  )
  const [hardDuration, setHardDuration] = useState<string>(
    `${timerSettings?.hard}`
  )

  const timerDurationInputs = [
    {
      id: 'easy',
      label: 'Easy',
      value: easyDuration,
      onChange: setEasyDuration,
    },
    {
      id: 'medium',
      label: 'Medium',
      value: mediumDuration,
      onChange: setMediumDuration,
    },
    {
      id: 'hard',
      label: 'Hard',
      value: hardDuration,
      onChange: setHardDuration,
    },
  ]

  function handleOnClick(timerSettings: TimerSettings) {
    LocalStorage.setTimerSettings(timerSettings)
  }

  return (
    <Drawer
      id="settings-drawer"
      title="Settings"
      isOpen={isOpen}
      onClose={closeDrawer}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold">Enable timer</p>
        <Toggle checked={isTimerEnabled} onChange={setIsTimerEnabled} />
      </div>
      <div className="relative mt-5">
        <p className="font-semibold py-3">Timer duration (in minutes):</p>
        {timerDurationInputs.map((input, idx) => (
          <SettingsInput
            key={idx}
            id={input.id}
            label={input.label}
            value={input.value}
            onChange={input.onChange}
            disabled={!isTimerEnabled}
          />
        ))}
        <div className="absolute right-0 py-2 mt-6">
          <Button
            onClick={() =>
              handleOnClick({
                enabled: isTimerEnabled,
                easy: Number(easyDuration),
                medium: Number(mediumDuration),
                hard: Number(hardDuration),
              })
            }
          >
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
