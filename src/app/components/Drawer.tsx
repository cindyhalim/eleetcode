import { AnimatePresence, motion } from 'framer-motion'
import { type PropsWithChildren } from 'react'

import CloseButton from './CloseButton'

type DrawerProps = {
  id: string
  title: string
  isOpen: boolean
  onClose: () => void
}

const INITIAL_X = 500

export default function Drawer({
  id,
  title,
  isOpen,
  onClose,
  children,
}: PropsWithChildren<DrawerProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          initial={{ x: INITIAL_X }}
          animate={{ x: 0 }}
          transition={{
            type: 'linear',
            duration: 0.2,
          }}
          exit={{ x: INITIAL_X }}
          className="fixed right-0 top-0 z-40 h-screen w-[500px] overflow-y-auto bg-white p-4 shadow-md"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
        >
          <h3
            id={`${id}-label`}
            className="mb-4 inline-flex items-center text-lg font-bold text-gray-800"
          >
            {title}
          </h3>
          <CloseButton onClose={onClose} />
          <div className="py-4 text-sm">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
