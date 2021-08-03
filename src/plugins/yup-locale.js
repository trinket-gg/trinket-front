import { setLocale } from 'yup'

setLocale({
  mixed: {
    required: { key: 'required' },
  },
  string: {
    email: { key: 'email' },
    min: ({ min }) => ({ key: 'min', values: { min } }),
    max: ({ max }) => ({ key: 'max', values: { max } }),
    match: ({ match }) => ({ key: 'match', values: { match } }),
  }
})