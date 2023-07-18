export const formatPrice = (price) => {
const newNumber = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD"
}).format(price / 100)
    return newNumber;
}

export const getUniqueValues = () => {}
