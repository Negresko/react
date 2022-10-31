import {Headset} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner(){
    return(
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Procurando alguem para se <span className="text-transparent bg-nlw-gradient bg-clip-text">Divertir?</span></strong>
            <span className="text-zinc-400 block">Entre no Discord e encontre a sua Galera! <a href="" className="text-transparent bg-clip-text bg-violet-500">ROCK</a></span>
          </div>  
          <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <Headset size={24}/>
            Entrar Agora!
          </Dialog.Trigger>
        </div>
      </div>
    )
}