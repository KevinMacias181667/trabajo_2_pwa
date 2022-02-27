import { useState } from 'react'
import { supabase } from '../../config/supabaseClient'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (email) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">ACCEDER</h1>
                <p className="description">
                 accede a la aplicación colocando tu correo y enseguida ve a tu correo para acceder</p>
                <div>
                    <input
                        className="inputField"
                        type="email"
                        placeholder="tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin(email)
                        }}
                        className={'button block'}
                        disabled={loading}
                    >
                        {loading ? <span>Loading</span> : <span>Enviar correo magico</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}