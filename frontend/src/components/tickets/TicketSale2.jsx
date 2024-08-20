import React, { useState, useEffect } from "react";

const TicketSale = ({ games, onSubmit }) => {
    const [selectedGames, setSelectedGames] = useState([]);
    const [discount, setDiscount] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedGames, discount]);

    const handleGameChange = (game, amount) => {
        setSelectedGames((prev) => {
            const exists = prev.find((g) => g.id === game.id);
            if (exists) {
                return prev.map((g) =>
                    g.id === game.id ? { ...g, amount: amount || g.amount } : g
                );
            } else {
                return [...prev, { ...game, amount: amount || 1 }];
            }
        });
    };

    const handleCheckboxChange = (game) => {
        setSelectedGames((prev) => {
            const exists = prev.find((g) => g.id === game.id);
            if (exists) {
                return prev.filter((g) => g.id !== game.id);
            } else {
                return [...prev, { ...game, amount: 1 }];
            }
        });
    };

    const calculateTotalPrice = () => {
        const total = selectedGames.reduce(
            (acc, game) => acc + game.price * game.amount,
            0
        );
        setTotalPrice(total);
        if (discount) {
            setDiscountedPrice(total * 0.9); // Assume a 10% discount for example
        } else {
            setDiscountedPrice(total);
        }
    };

    const handleSubmit = () => {
        const ticketData = {
            games: selectedGames.map((game) => ({
                game_id: game.id,
                amount: game.amount,
                total_price: game.price * game.amount,
            })),
            total_price: discountedPrice,
        };
        onSubmit(ticketData);
    };

    return (
        <div>
            <h2>Game Ticket Form</h2>
            <form>
                {games.map((game) => (
                    <div key={game.id} style={{ marginBottom: "10px" }}>
                        <input
                            type="checkbox"
                            id={`game_${game.id}`}
                            onChange={() => handleCheckboxChange(game)}
                            checked={
                                !!selectedGames.find((g) => g.id === game.id)
                            }
                        />
                        <label
                            htmlFor={`game_${game.id}`}
                            style={{ marginRight: "10px" }}
                        >
                            {game.name}
                        </label>
                        <input
                            type="text"
                            value={game.price}
                            disabled
                            style={{ width: "50px", marginRight: "10px" }}
                        />
                        <input
                            type="number"
                            min="1"
                            disabled={
                                !selectedGames.find((g) => g.id === game.id)
                            }
                            value={
                                selectedGames.find((g) => g.id === game.id)
                                    ?.amount || 1
                            }
                            onChange={(e) =>
                                handleGameChange(game, parseInt(e.target.value))
                            }
                            style={{ width: "50px" }}
                        />
                    </div>
                ))}
                <div style={{ marginTop: "20px" }}>
                    <label>Total Price: ${totalPrice.toFixed(2)}</label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={discount}
                            onChange={() => setDiscount(!discount)}
                        />
                        Apply Discount
                    </label>
                </div>
                {discount && (
                    <div>
                        <label>
                            Discounted Price: ${discountedPrice.toFixed(2)}
                        </label>
                    </div>
                )}
                <button type="button" onClick={handleSubmit}>
                    Add Ticket
                </button>
            </form>
        </div>
    );
};

export default TicketSale;
