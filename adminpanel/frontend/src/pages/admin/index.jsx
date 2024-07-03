import React from 'react'
import AppLayout from '../../components/applayout'

function Admin() {
  return (
    <AppLayout>
<div className="container">
<div className="row">
<h1>Welcome </h1>
    <div className="col-12 col-md-6 col-sm-6">
       
        <div className="card shadow-lg p-4">
            <h2>Registered Companpies</h2>
            <p>100+</p>
        </div>
    </div>

    <div className="col-12 col-md-6 col-sm-6">
        <div className="card shadow-lg p-4">
            <h2>Registered Students</h2>
            <h3>1000+</h3>
        </div>
    </div>
</div>

</div>

    </AppLayout>
  )
}

export default Admin