import { atom } from "jotai";

export const tokenAtom = atom(null);
export const userAtom = atom(null);
export const isSubmittingAtom = atom(false);
export const responseMessageAtom = atom("");
export const loggedInAtom = atom((get) => {
	const token = get(tokenAtom);
	return Boolean(token); // Converts string to true and null to false
});
export const isEditingAtom = atom(false);
