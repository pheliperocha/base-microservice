export const log = {
  info: (message: string) => console.warn('\x1b[36mℹ️', message, '\x1b[0m'),
  warn: (message: string) => console.warn('\x1b[35m🚨', message, '\x1b[0m'),
  error: (message: string) => console.warn('\n\x1b[7m\x1b[31m💩', message, '\x1b[0m\n'),
}
