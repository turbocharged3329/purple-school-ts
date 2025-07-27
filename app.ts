enum UserRole {
    Admin = 'admin',
    Moderator = 'moderator',
    User = 'user',
}

interface User {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string,
    bloodGroup: string,
    height: number,
    weight: number,
    eyeColor: string,
    hair: {
        color: string,
        type: string,
    },
    ip: string,
    address: {
        address: string,
        city: string,
        state: string,
        stateCode: string,
        postalCode: string,
        coordinates: {
            lat: number,
            lng: number,
        },
        country: string,
    },
    macAddress: string,
    university: string,
    bank: {
        cardExpire: string,
        cardNumber: string,
        cardType: string,
        currency: string,
        iban: string,
    },
    company: {
        department: string,
        name: string,
        title: string,
        address: {
            address: string,
            city: string,
            state: string,
            stateCode: string,
            postalCode: string,
            coordinates: {
                lat: number,
                lng: number,
            },
            country: string,
        },
    },
    ein: string,
    ssn: string,
    userAgent: string,
    crypto: {
        coin: string,
        wallet: string,
        network: string,
    },
    role: string,
}

function isCorrectUser(user: unknown): asserts user is User {
    if (typeof user !== 'object' || user === null) {
        throw new Error('User is not an object')
    }

    if ('id' in user == false || 'role' in user == false) {
        throw new Error('User is not a valid user')
    }
}

async function getAdminUsers(): Promise<User[] | []> {
    try {
        const response = await fetch('https://dummyjson.com/users')
        const data = await response.json()
        
        const users = data.users.forEach((user: unknown) => isCorrectUser(user))

        return users.filter((user: User) => user.role === UserRole.Admin)
    } catch (error) {
        console.error(error)
        return []
    }
}

