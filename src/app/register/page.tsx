'use client'

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';

export default function Page(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        console.log("user created");
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[200px]">
      <div>
        <label htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='bg-gray-700'
        />
      </div>
      <div>
        <label htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='bg-gray-700'
        />
      </div>
      <Button
        type="submit"
      >
        Sing up
      </Button>
    </form>
  );
}
