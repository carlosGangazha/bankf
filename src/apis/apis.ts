
export interface BalanceResponse {
    balance: number;
  }
  
  export const fetchBalance = async (token: string): Promise<number> => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const { userId, sub: email } = payload;
  
      const response = await fetch('http://localhost:8080/transactions/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
  
      const balanceData: BalanceResponse = await response.json();
      return balanceData.balance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error; 
    }
  };