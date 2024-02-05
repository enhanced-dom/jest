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
  const consolidatedTransformersConfig = ts
    ? [
        'ts-jest',
        {
          tsconfig: processorConfigPath ?? path.join(__dirname, 'tsconfig.json'),
          ...transformersConfig,
        },
      ]
    : [
        'babel-jest',
        {
          rootDir: processorConfigPath ? path.dirname(path.join(__dirname, processorConfigPath)) : __dirname,
          ...transformersConfig,
        },
      ]

  const config = {
    preset: ts ? 'ts-jest' : 'babel-jest',
    testEnvironment,
    transform: ts
      ? {
          '^.+\\.jsx?$': consolidatedTransformersConfig, // eslint-disable-line @typescript-eslint/naming-convention
          '^.+\\.tsx?$': consolidatedTransformersConfig, // eslint-disable-line @typescript-eslint/naming-convention
          ...transformers,
        }
      : {
          '^.+\\.jsx?$': consolidatedTransformersConfig, // eslint-disable-line @typescript-eslint/naming-convention
          ...transformers,
        },
    transformIgnorePatterns: transformIgnorePatterns,
  }
  return config
}
