module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["ts", "js", "json", "node"]
}
