import React from 'react'
import Field from '@components/Field'

import img from '@static/images/spin_on.png'

const App = () => {
    const kek = ' lol'

    return (
        <div>
            Hello, World!
            <Field />
            <img src={img} alt="" />
        </div>
    )
}

export default App
