import { modalitiesCommand } from '../src/commands/modalities';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { getAccessToken } from '../src/commands/login';

describe('modalitiesCommand', () => {
  it('should be defined and have correct name', () => {
    expect(modalitiesCommand).toBeDefined();
    expect(modalitiesCommand.name()).toBe('modalities');
  });

  it('should generate TypeScript file from models', async () => {
    // Mock getAccessToken
    jest.spyOn(require('../src/commands/login'), 'getAccessToken').mockResolvedValue('test-token');
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [
          {
            modelId: 'TestModel',
            schema: { type: 'object', properties: { foo: { type: 'string' } } }
          }
        ]
      })
  }) as any;

    // Run command with custom output
    const outFile = path.resolve(__dirname, 'test-modalities-types.d.ts');
    if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
    await modalitiesCommand.parseAsync(['node', 'modalities', '--out', outFile]);
    expect(fs.existsSync(outFile)).toBe(true);
    const content = fs.readFileSync(outFile, 'utf8');
    expect(content).toContain('interface TestModel');
    fs.unlinkSync(outFile);
  });
});
