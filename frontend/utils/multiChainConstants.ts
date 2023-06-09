export const connext: { [key: number]: string} = {
    5: "0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649",        //Goerli
    420: "0x5Ea1bb242326044699C3d81341c5f535d5Af1504",      // optimism goerli
    80001: "0x2334937846Ab2A3FCE747b32587e1A1A2f6EEC5a",    // mumbai testnet
    421613: "0x2075c9E31f973bb53CAE5BAC36a8eeB4B082ADC2"    // arbitrum goerli
}

export const registries: { [key: number]: string } = {
    5: "0xF2217656B69a0f822d6dBD54B42641B44697dAb8",
    420: "0x46539763C1eA530f8CC88E81d911Efc48a1411f3",
    80001: "0x1BA989F00755F20936DDA2B781D38470529B9C53",
    421613: "0x46539763C1eA530f8CC88E81d911Efc48a1411f3"
}

export const connextDomain: { [key: number]: number} = {
    5: 1735353714,
    420: 1735356532,
    80001: 9991,
    421613: 421613
}

export const registryRoutes: { [key: number]: { [key: number] : string}} = {
    5: {
        0: "0x5a0ec6A7bfc10cFD36D7f7847e917e3Fc6a815A1"
    },
    420: {
        0: "0x5D5d2B8d4E1DF2DAce70435E6b7e54269D48a6C7"
    },
    80001: {
        0: "0x5276beec3470C595337f4E4CA70b088e484580AA"
    },
    421613: {
        0: "0x5D5d2B8d4E1DF2DAce70435E6b7e54269D48a6C7"
    }
}


export const AaveWeth: { [key: number]: string} = {
    5: "0xCCB14936C2E000ED8393A571D15A2672537838Ad",
    420: "0xc5Bf9eb35c7d3a90816436E2a124bdd136e09fFD",
    80001: "0xD087ff96281dcf722AEa82aCA57E8545EA9e6C96",
    421613: "0xb83C277172198E8Ec6b841Ff9bEF2d7fa524f797"
}


export const ConnextWeth: { [key: number]: string} = {
    5: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    420: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
    80001: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
    421613: "0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2"
}

export const explorers: { [key: number]: string} = {
    5: "goerli.etherscan.io",
    420: "optimistic.etherscan.io",
    80001: "mumbai.polygonscan.com",
    421613: "arbiscan.io"
}