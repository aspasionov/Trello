import React from 'react'
import Field from '@components/Field'

import img from '@static/images/spin_on.png'

const App: React.FC = () => (
        <div>
            Hello, World!
            <Field />
            <img src={img} alt="" />
        </div>
)

export default App
