export const formatComment = number => Number(number?.toFixed(1)).toLocaleString();
export function getBase64(file) {
    if (!file) return ''
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalids++
            setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Require this field' }])
        }
    }

    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'email':
                // const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!arr[1].match(regex)) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'This Email is invalid.' }])
                }
                if (arr[1].length > 256) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'This email field length too long' }])
                }
                break;

            case 'password':
                if (arr[1].length < 6) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Password minximum 6 characters.' }])
                }
                break;
        }
    }
    return invalids
}