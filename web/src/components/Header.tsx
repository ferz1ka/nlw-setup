import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'phosphor-react'

import logoImg from "../assets/logo.svg"
import { NewHabitForm } from './NewHabitForm';

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <img src={logoImg} alt="Habits" className="" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="border-2 border-violet-600 font-semibold rounded-lg px-6 py-4 flex justify-center items-center gap-3 transition-colors hover:border-violet-500 group focus:outline-none"
        >
          <Plus size={20} weight="bold" className="text-violet-500 group-hover:text-violet-500" />
          Novo hábito
        </Dialog.Trigger>
        <Dialog.Portal >
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />
          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Close className='absolute right-6 top-6 transition-colors text-zinc-400 hover:text-zinc-200'>
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>
            <Dialog.Title className='text-2xl leading-tight font-extrabold'>
              Criar hábito
            </Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div >
  )
}