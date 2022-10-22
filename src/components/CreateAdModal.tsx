import { Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox';
import { Input } from './Form/input'
import { useState, useEffect, FormEvent } from 'react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';



interface Game{
    id: string;
    title: string;
}

export function CreateAdModal(){
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games').then(response =>{
            setGames(response.data)
        })
}, [])

async function handleCreateAd(event: FormEvent){
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement) //HTMLFormElement está forçando o target a entender que ele é um formulario
    const data = Object.fromEntries(formData)

    if(!data.name){
        return;
    }

    try{
        await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hoursStart: data.hoursStart,
            hoursEnd: data.hoursEnd,
            useVoiceChannel: useVoiceChannel
    
        })

        alert('Anuncio criado com Sucesso!')
    } catch (err){
        console.log(err);
        alert('Erro ao criar o anuncio!')
    }
    
}

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title>O que você Busca?</Dialog.Title>
              <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o Game?</label>
                    <select name="game" id="game" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none">
                        <option disabled value="">Selecione o game que deseja Jogar!</option>
                        {games.map(game =>{
                            return(
                                <option key={game.id} value={game.id}>{game.title}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (Nickname)</label>
                  <Input name="name" id="name" placeholder="Como você deseja ser Chamado!" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quanto tempo?</label>
                    <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Começou agora?" />
                  </div>
                  <div className="flex flex-col gap-2"> 
                    <label htmlFor="">Qual o seu Discord?</label>
                    <Input name="discord" id="discord" placeholder='Usuario#12345' />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quais dias costuma Jogar?</label>
                        <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-2" value={weekDays} onValueChange={setWeekDays}>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : ' bg-zinc-900'}`} value="0" title="Domingo">D</ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : ' bg-zinc-900'}`} value="1" title="Segunda">S</ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : ' bg-zinc-900'}`} value="2" title="Terça">T</ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : ' bg-zinc-900'}`} value="3" title="Quarta">Q</ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : ' bg-zinc-900'}`} value="4" title="Quinta">Q</ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : ' bg-zinc-900'}`} value="5" title="Sexta">S</ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : ' bg-zinc-900'}`} value="6" title="Sabado">S</ToggleGroup.Item>
                        </ToggleGroup.Root>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="hoursStart">Em que horário</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input name="hoursStart" id="hoursStart" type="time" placeholder=""/>
                      <Input name="hoursEnd" id="hoursEnd" type="time" placeholder=""/>
                    </div>
                  </div>
                </div>
                <label className="mt=2 flex items-center gap-2 text-sm">
                    <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                        if(checked == true){
                            setUseVoiceChannel(true)
                        } else {
                            setUseVoiceChannel(false)
                        }    
                    }} className="w-6 h-6 p-1 rounded bg-zinc-900">
                        <Checkbox.Indicator>
                            <Check className="w-4 h-4 text-emerald-400"/>
                        </Checkbox.Indicator>  
                    </Checkbox.Root>
                    Quero me conectar ao Chat de Voz
                </label>
                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600" type="button">Cancelar</Dialog.Close>
                  <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit"><GameController className="w-6 h-6"/>Entrar</button>
                </footer>
              </form> 
          </Dialog.Content>        
        </Dialog.Portal>
    );
}
