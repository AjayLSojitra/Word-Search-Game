import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  inputsContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginBottom: 8,
  },
  otpinputsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginBottom: 8,
  },
  codeContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#DFDFDE",
    height: 60,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  codeText: {
    fontSize: 28,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.01,
  },
  stick: {
    width: 2,
    height: 30,
    backgroundColor: "white",
  },
});
