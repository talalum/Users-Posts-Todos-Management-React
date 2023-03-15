import { useState, useEffect } from 'react'

const Address = ({ userAddress, displayAddress, callback }) => {
    const [address, setAddress] = useState({
        street: userAddress.street,
        city: userAddress.city,
        zipcode: userAddress.zipcode,
    })
    useEffect(() => {
        callback(address);
    }, [address.city, address.street, address.zipcode])

    return (
        <div className={displayAddress ? 'display-address address' : 'hidden address'}>
            <div>Street: <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}/><br /></div>
            <div>City: <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /><br /></div>
            <div>Zip Code: <input type="text" value={address.zipcode} onChange={(e) => setAddress({ ...address, zipcode: e.target.value })} /><br /></div>
        </div>
    )
}

export default Address