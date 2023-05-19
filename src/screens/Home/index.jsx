import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Tarefa } from "../components/Tarefa";
import { useState } from "react";

export function Home() {
    const [tarefa, setTarefa] = useState('');
    const [tarefas, setTarefas] = useState(['Atividade de React']);
    function handleTarefaAdd() {
        if(tarefas.includes(tarefa)){
            return Alert.alert('Tarefa já existe','A tarefa infomada já exite.')
        }else if(tarefa.trim() === ""){
            return Alert.alert('Informe o nome','Informe o nome do participante.')    
        }
        setTarefas(prevState => [...prevState, tarefa]);
        setTarefa('');
    }

    function handleTarefaRemove(name) {
        Alert.alert('Remover?',`Tem certeza que deseja remover ${name}?`,[
            {
                text: 'Não'
            },
            {
                text: 'Sim',
                onPress: () => setTarefas(prevState => prevState.filter(part => part !== name))
            },
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Tarefas
            </Text>

            <Text style={styles.eventDate}>
                Quinta, 11 de maio de 2023.
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    value={tarefa}
                    onChangeText={setTarefa}
                />

                <TouchableOpacity style={styles.buttonAdd} onPress={handleTarefaAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Tarefa
                    name={item}
                    remove={()=>handleTarefaRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />
        </View>
    );
}