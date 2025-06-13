import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ searchText, onSearchTextChange, onSearchSubmit }) => {
  return (
    <View style={styles.container}>
      {/* Campo de entrada de texto */}
      <TextInput
        style={styles.input}
        placeholder="Digite o título do filme..."
        value={searchText}
        onChangeText={onSearchTextChange}
        onSubmitEditing={onSearchSubmit}
        returnKeyType="search"
      />
      {/* Botão de busca com ícone */}
      <TouchableOpacity style={styles.button} onPress={onSearchSubmit}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
