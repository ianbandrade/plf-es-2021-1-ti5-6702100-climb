import {  UseToastOptions } from "@chakra-ui/react";

export const defaultTitlesToast = {
  ["error"]: "Erro!",
  ["warning"]: "Aviso!",
  ["success"]: "Sucesso!",
};

const {position}:UseToastOptions = {
  position: "bottom-left",
} 

export const getMessages = ({ message }: { message: string[] }) =>
  new Array().concat(message ?? []);


export const messageFactory = (data: any, status: "error" | "warning" | "success"): UseToastOptions[] => (
  getMessages(data).map((description, i) => ({
    title: defaultTitlesToast[status],
    description: `${description}`,
    status,
    id: i,
    position
  })
  ))

export const showDefaultFetchError = (inData: string): UseToastOptions => (
  {
    title: defaultTitlesToast.error,
    description: `Não foi possível comunicar com o servidor ${inData}`,
    status: "error",
    id: 1,
    position,
  })

export const newBaseToast = (status:  "error" | "warning" | "success"):UseToastOptions => ({
    title: defaultTitlesToast[status],
    status: status,
    position,
    duration: 4000,
  })