import path from 'path'

export const jestConfigFactory = ({
  ts,
  testEnvironment = 'jest-environment-jsdom',
  processorConfigPath,
  transformIgnorePatterns = ['node_modules/(?!@enhanced-dom/)'],
  transformersConfig = {},
  transformers = {},
}: {
  ts?: boolean
  testEnvironment?: string
  processorConfigPath?: string
  transformIgnorePatterns?: string[]
  transformersConfig?: Record<string, any>
  transformers?: Record<string, string>
} = {}) => {
  const config = {
    preset: ts ? 'ts-jest' : 'babel-jest',
    testEnvironment,
    globals: ts
      ? {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'ts-jest': {
            tsconfig: processorConfigPath ?? path.join(__dirname, 'tsconfig.json'),
          },
          ...transformersConfig,
        }
      : {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'babel-jest': {
            rootDir: processorConfigPath ? path.dirname(path.join(__dirname, processorConfigPath)) : __dirname,
          },
          ...transformersConfig,
        },
    transform: ts
      ? {
          '^.+\\.jsx?$': 'ts-jest', // eslint-disable-line @typescript-eslint/naming-convention
          '^.+\\.tsx?$': 'ts-jest', // eslint-disable-line @typescript-eslint/naming-convention
          ...transformers,
        }
      : {
          '^.+\\.jsx?$': 'babel-jest', // eslint-disable-line @typescript-eslint/naming-convention
          ...transformers,
        },
    transformIgnorePatterns: transformIgnorePatterns,
  }
  return config
}
