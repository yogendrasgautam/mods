export type CardPart = 'file' | 'connector'

/** The tool the hand-off came from: a Read, a Bash read (cat, grep, curl), or a connector tool. */
export type CardTool = 'Read' | 'Bash' | 'connector'

/** working: Sonnet is reading. done: Claude got the notes. failed: the plain (or trimmed) result went on. kept: notes from earlier, no Sonnet call. */
export type CardPhase = 'working' | 'done' | 'failed' | 'kept'

/** One hand-off to Sonnet, as the pane draws it. */
export type Card = {
  id: string
  /** The chat it belongs to; the pane draws only its own chat's cards. */
  session: string
  part: CardPart
  /** Missing on cards from before 2026-11-03: Read for file, connector for connector. */
  tool?: CardTool
  /** Short name: the file's name, or the connector tool's own name. */
  label: string
  /** Full file path, or the full connector tool name. */
  where: string
  /** Tokens Claude would have read, and what it read instead (null until known). */
  before: number
  after: number | null
  /** Sonnet requests in all, and how many have answered so far. */
  requests: number
  answered: number
  /** List price of the Sonnet requests; null when unknown. */
  usd: number | null
  startedAt: number
  endedAt: number
  phase: CardPhase
  /** The live or final state line in plain words. */
  state: string
  /** Exactly what Claude got. */
  notes: string
  /** The detail file, and the full result (the saved connector result, or the file itself). */
  detail: string | null
  full: string | null
}

declare module 'claude-code' {
  interface PluginState {
    'read-digest': {
      cards: Card[]
      /** The one card whose notes are open, or ''. */
      open: string
      off: boolean
    }
  }
}
