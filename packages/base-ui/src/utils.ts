import { extendTailwindMerge, validators } from 'tailwind-merge'


const cx = (classNames: (string | false | undefined | null)[]) =>
  classNames.filter(Boolean).join(' ')

const twMerge = extendTailwindMerge({})

export { cx, twMerge }
