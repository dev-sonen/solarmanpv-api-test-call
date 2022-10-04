import * as dotenv from 'dotenv'

import express from 'express'
import axios from 'axios'

import stringify from 'json-stringify-pretty-compact'

const app = express()
dotenv.config()

const port = process.env.NETWORK_PORT

app.get( '/' , async ( req , res ) => {

    try {

        const obj = await axios( {
            method: 'post',
            url: 'https://api.solarmanpv.com/account/v1.0/token',
            params: {
                appId: process.env.APP_ID,
                language: 'en'
            },
            data: {
                appSecret: process.env.APP_SECRET,
                email: process.env.CREDENTIALS_EMAIL,
                password: process.env.CREDENTIALS_PASSWORD      // -> SHA256
            },
            headers: {
                'Content-Type': 'application/json'
            }
        } )
        .then( async res => {
    
            const { data } = res

            console.log( data )     // displayed on the CLI.

            if( data.success === true ) {

                return await axios( {
                    method: 'post',
                    url: `https://api.solarmanpv.com/station/v1.0/list`,
                    params: {
                        language: 'en'
                    },
                    data: {
                        page: 1,
                        size: 20
                    },
                    headers: {
                        'Authorization': `bearer ${ data.access_token }`,
                        'Content-Type': 'application/json'
                    }
                } )
                .then( res => {
            
                    const { data } = res

                    console.log( data )     // displayed on the CLI.
                    
                    return data
            
                } )
                .catch( err => {
            
                    if( err ) {
                        
                        console.error( err.message )
                        return null
            
                    }
            
                } )

            }

            return null
    
        } )
        .catch( err => {
    
            if( err ) {
                
                console.error( err.message )
                return null
    
            }
    
        } )

        res.send( obj === null || obj === undefined ? {} : `<pre>${ stringify( obj , { indent: '   ' } ) }</pre>` )
        res.end()

    } catch ( err ) {

        if( err ) {

            console.error( err.message )
            res.end( {} )

        }

    }

} )

app.listen( port , () => console.log( 'app is now running at port: ' + port ) )