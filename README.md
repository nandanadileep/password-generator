# Fun Math Behind 

This project isn't just a random string generator; it uses **Information Theory** to estimate password strength. This document explains the mathematics used to calculate entropy and why we use specific numbers in the code.

## 1. What is Entropy?
Entropy is a measure of randomness or "unpredictability." In the context of passwords, it is measured in **bits**. 

* **1 bit** = A choice between 2 equal options (e.g., a coin flip: Heads or Tails).
* **10 bits** = A choice between $2^{10}$ (1,024) options.
* **100 bits** = A choice between $2^{100}$ options.

The higher the entropy, the exponentially harder it is for a computer to guess the password using brute-force attacks.

---

## 2. The Character Pool ($N$)
Our generator uses the following character set:

> `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}`

Breaking this down:
* **Lowercase:** 26
* **Uppercase:** 26
* **Numbers:** 10
* **Symbols:** 18
* **Total Pool Size ($N$):** 80 characters

## 3. The Formula
The theoretical entropy ($H$) of a random password is calculated as:

$$H = L \times \log_2(N)$$

Where:
* $L$ = Password Length
* $N$ = Size of the Character Pool (80)

### The "Conservative" Estimate
Ideally, $\log_2(80) \approx 6.32$ bits per character. However, in `src/App.js`, we use a slightly lower, conservative multiplier of **5.8** to account for real-world scenarios (like excluding ambiguous characters or assuming a hacker knows the pattern):

```javascript
// Actual implementation in src/App.js
Entropy = Math.round(length * 5.8)