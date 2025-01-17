import React, { useEffect, useState } from 'react';
import { PlusCircleIcon} from '@heroicons/react/24/outline';
import axios from 'axios';

const PortfolioPage = ({ user }) => {
    const [portfolio, setPortfolio] = useState({ totalBalance: 0, transactions: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            const email = user?.email;
            try {
                const response = await axios.get(`https://dashboard-app-uzy6.onrender.com:5000/api/portfolio/${email}`); // Adjust API endpoint as needed
                setPortfolio(response.data);
            } catch (err) {
                console.error('Error fetching portfolio:', err);
                setError('Failed to load portfolio data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [user]);

    if (loading) {
        return <div>Loading portfolio...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <br />
            <h2 className="text-3xl font-semibold">Stock</h2>
            <p className="mt-4">This is the main content of the portfolio.</p>

            <div className="grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card for Total Balance */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Total Balance</h3>
                    <p className="text-2xl mt-2">{portfolio.totalBalance.toFixed(2)} USD</p>
                </div>
                <a className="w-20 flex flex-col items-center justify-center" href='/dashboard/crypto-payment'>
                    <PlusCircleIcon className="h-20 text-gray-500"></PlusCircleIcon>
                </a>
            </div>
            <div className='flex flex-wrap space-x-0 sm:space-x-4'>
                <div className="flex-auto bg-white p-6 my-4 rounded-lg shadow-md h-auto w-[500px]">
                    <h3 className="text-xl mb-2 font-semibold">Transaction History</h3>
                    <hr />
                    <table class="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-blue-100 text-gray-900">
                                <th class="px-4 py-2 text-sm text-left border-b border-gray-200">Amount</th>
                                <th class="px-4 py-2 text-sm text-left border-b border-gray-200">Hash</th>
                                <th class="px-4 py-2 text-sm text-left border-b border-gray-200">Date</th>
                            </tr>
                        </thead>
                        <tbody id="transactionsTable" class="text-sm text-gray-800">
                            {/* Cards for Individual Transactions */}
                            {portfolio.transactions.map((tx) => (
                                <tr key={tx._id}>
                                    <td className="mx-5 p-4 mt-2">{tx.expectedCryptoAmount} USD</td>
                                    <td className="mx-5 p-4 mt-2"> recieved</td>
                                    <td className="mx-5 p-4 mt-2"> {new Date(tx.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
