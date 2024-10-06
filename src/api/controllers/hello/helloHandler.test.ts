// helloHandler.test.js
import { describe, it, expect, vi } from 'vitest';
import helloHandler from './helloHandler';
import { Request, Response } from 'express';

describe('GET /hello handler', () => {
  it('should respond with Hello World', () => {
    // Create mock request and response objects
    const req = {} as Request; // No specific request properties needed for this test
    const res = {
      json: vi.fn(), // Mock function to simulate res.json()
    } as unknown as Response;

    // Call the handler with mock objects
    helloHandler.getHello(req, res);

    // Assertions
    expect(res.json).toHaveBeenCalledTimes(1); // Ensure res.json() was called
    expect(res.json).toHaveBeenCalledWith('Hello World'); // Ensure the correct response is returned
  });
});
