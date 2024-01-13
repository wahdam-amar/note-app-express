import { expect } from "chai";
import jwt from "jsonwebtoken";
import sinon from "sinon";

describe("Token Expiration", () => {
  it("should expire after one hour", () => {
    const userId = "123456";
    const secret = "your_secret_key";
    const expiresIn = "1h";

    // Stub Date.now to simulate different times in the test
    const clock = sinon.useFakeTimers();

    // Create a token that expires after one hour
    const token = jwt.sign({ userId }, secret, { expiresIn });

    // Move the clock forward by one hour
    clock.tick(60 * 60 * 1000);

    // Try to verify the token after one hour
    try {
      const decoded = jwt.verify(token, secret);
      // If the verification succeeds, it means the token has not expired yet
      expect.fail("Token should have expired");
    } catch (error) {
      // Verify that the error is due to token expiration
      expect(error.name).to.equal("TokenExpiredError");
    } finally {
      // Restore the original clock
      clock.restore();
    }
  });
});
