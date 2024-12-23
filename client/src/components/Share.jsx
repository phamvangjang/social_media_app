import React, { useState } from 'react'

const Share = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const contacts = [
        { name: "tester", username: "khidot705 và vangiang10.01", img: "https://placehold.co/50x50", verified: false },
        { name: "Van Giang", username: "vangiang10.01", img: "https://placehold.co/50x50", verified: false },
        { name: "Anh Tân", username: "khidot705", img: "https://placehold.co/50x50", verified: false },
        { name: "Võ Tấn Lịch", username: "lich.vo.14", img: "https://placehold.co/50x50", verified: false },
        { name: "Dwayne Johnson", username: "therock", img: "https://placehold.co/50x50", verified: true },
    ];
    return (
        <div className="flex flex-col justify-center">
            <div className="p-4">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="w-full p-2 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overflow-y-auto max-h-60">
                    {contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase())).map((contact, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
                            <div className="flex items-center">
                                <img src={contact.img} alt={`${contact.name}'s profile`} className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <div className="flex items-center">
                                        <span className="font-semibold">{contact.name}</span>
                                        {contact.verified && <i className="fas fa-check-circle text-blue-500 ml-1"></i>}
                                    </div>
                                    <span className="text-gray-500 text-sm">{contact.username}</span>
                                </div>
                            </div>
                            <input type="radio" name="contact" className="form-radio" />
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Share