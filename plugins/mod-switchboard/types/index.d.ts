/** A short line under the list after a press: "Cache Keeper is off in every chat." */
export type Note = string

declare module 'claude-code' {
  interface PluginState {
    'mod-switchboard': { note: Note }
  }
}
