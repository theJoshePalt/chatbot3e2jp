// app/chat.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import RespMessage from "../components/RespMessage"; // componente para mostrar cada mensaje (asegúrate que exista)
import WelcomeM from "../components/WelcomeM"; // pantalla bienvenida (asegúrate que exista)
import "@/global.css";

/**
 * POR AHORA el codigo solo es UI no funciona
 * - no tiene lógica para enviar mensajes
 * - el botón está deshabilitado
 * - sirve para diseñar y probar la apariencia antes de conectar la IA
 */

export default function Chat() {
  // Mensajes por ahora vacíos.
  const [mensajes, setMensajes] = useState<any[]>([]);

  return (
    <View className="flex-1 bg-[#011803]">
      

      {/* CONTENIDO: si no hay mensajes mostramos el componente de bienvenida */}
      <View className="flex-1 p-4">
        {mensajes.length === 0 ? (
          // WelcomeM ocupa todo el espacio disponible (ver componente WelcomeM)
          <View className="flex-1 justify-center items-center">
            <WelcomeM />
          </View>
        ) : (
          // FlatList placeholder (mostrará mensajes cuando haya)
          <FlatList
            data={mensajes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <RespMessage type={item.type} text={item.text} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

      {/* BARRA INFERIOR PARA LOS MENSJES: input + botón*/}
      <View className="w-full px-4 pb-6 bg-transparent">
        <View className="flex-row items-center bg-white rounded-2xl shadow p-2">
          {/* TextInput visual: aún no manda nada */}
          <TextInput
            value={""}
            onChangeText={() => {}}
            placeholder="cuentame :v "
            placeholderTextColor="#9CA3AF"
            className="flex-1 px-3 text-gray-700"
            editable={false} // DESHABILITADO la opcion de escribir 
          />

          {/* Botón deshabilitado para mandar mensajes */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="ml-2 px-4 py-2 rounded-xl bg-[#27F535] opacity-50"
            disabled
          >
            <Text className="font-semibold">Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
