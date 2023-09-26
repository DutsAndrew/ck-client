import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest', // mock typescript files
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // mock CSS modules
  },
  testEnvironment: 'jsdom',
};

export default config;