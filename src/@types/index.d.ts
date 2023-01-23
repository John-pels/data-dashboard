/**
 *
 * TypeScript declarations for component props, payloads, and environment variables
 *
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
    }
  }
}

export type ITodos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export interface IButton {
  text: string;
  onClick?: () => void;
}

export type INewTaskPayload = Omit<ITodos, "id">;

export interface IInput {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

type ISelect = Omit<IInput, "type" | "placeholder">;

export interface IDropdown extends ISelect {
  options: Array<{ label: string; value: string }>;
}
