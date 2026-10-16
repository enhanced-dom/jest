import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url)) // eslint-disable-line @typescript-eslint/naming-convention

export const jestConfigFactory = ({
  ts,
  testEnvironment = 'jest-environment-jsdom',
  processorConfigPath,
  transformIgnorePatterns = ['node_modules/(?!@enhanced-dom/)'],
  transformersConfig = {},
  transformers = {},
  moduleNameMapper = {},
}: {
  ts?: boolean
  testEnvironment?: string
  processorConfigPath?: string
  transformIgnorePatterns?: string[]
  transformersConfig?: Record<string, any>
  transformers?: Record<string, string>
  moduleNameMapper?: Record<string, string>
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
    testEnvironment: testEnvironment === 'jest-environment-linkedom' ? path.join(__dirname, 'linkedom-environment.js') : testEnvironment,
    transform: ts
      ? {
          '^.+\\.jsx?$': consolidatedTransformersConfig,
          '^.+\\.tsx?$': consolidatedTransformersConfig,
          ...transformers,
        }
      : {
          '^.+\\.jsx?$': consolidatedTransformersConfig,
          ...transformers,
        },
    transformIgnorePatterns: transformIgnorePatterns,
    moduleNameMapper: {
      ...moduleNameMapper,
      '\\.(css|pcss|sass)$': moduleNameMapper['\\.(css|pcss|sass)$'] ?? path.join(__dirname, 'style-mock.js'),
    },
  }
  return config
}
