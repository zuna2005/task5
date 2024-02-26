import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Random from './assets/random.svg'
import ExportCSVButton from './ExportCSVButton'

const Home = () => {
    const [data, setData] = useState([])
    const [locale, setLocale] = useState("it")
    const [seed, setSeed] = useState(0)
    const [errNum, setErrNum] = useState(0)
    const [page, setPage] = useState(0)

    const getTable = async (loc, sed, errnum, page) => {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/table`, {locale: loc, seed: sed, errnum: errnum, page})
        .then(res => {
            
            setData(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => { 
      const handleScroll = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
        if (window.scrollY + 1 >= scrollableHeight) {
            getTable(locale, seed, errNum, page + 1)
            setPage(prev => prev + 1)
        }
      }
      getTable(locale, seed, errNum, page)
      window.addEventListener('scroll', handleScroll);

      return () => {
        // Remove the scroll event listener when the component unmounts
        window.removeEventListener('scroll', handleScroll);
      };
      }, [page])
    
    const handleChooseLocale = (event) => {
      setLocale(event.target.value)
      getTable(event.target.value, seed, errNum, page)
    }

    const handleSeedChange = (event) => {
      let seedd = !isNaN(parseInt(event.target.value)) ? parseInt(event.target.value) : 0
      setSeed(seedd)
      getTable(locale, seedd, errNum, page)
    }

    const handleRandomSeed = () => {
      let seedd = Math.floor(Math.random() * 9999999)
      setSeed(seedd)
      getTable(locale, seedd, errNum)

    }

    const handleErrorsChange = (event) => {
      let errnum = !isNaN(event.target.value) ? +event.target.value : 0
      errnum = errnum > 1000 ? 1000 : errnum
      setErrNum(errnum)
      getTable(locale, seed, errnum)
    }

    return (
        <div className="d-flex flex-column bg-dark align-items-center min-vh-100">
          <nav className="navbar">
            <div className="d-flex flex-row align-items-center">
              <label htmlFor='select' className="me-2 text-white">Region:</label>
              <select id='select' className="form-select" style={{ width: '120px' }} value={locale} onChange={handleChooseLocale}>
                <option value="it">Italy</option>
                <option value="de">Germany</option>
                <option value="pl">Poland</option>
              </select>
              <label htmlFor='range' className="me-2 ms-5 text-white">Errors:</label>
              <input type='range' className='form-range' min='0' step="0.1" max='10' id='range' onChange={handleErrorsChange} value={errNum}/>
              <input type='text' className="form-control ms-1"  style={{ width: '80px' }} onChange={handleErrorsChange} value={errNum}/>
              <label htmlFor='seed' className="me-2 ms-5 text-white">Seed:</label>
              <input id='seed' type='text' className="form-control" style={{ width: '120px' }} onChange={handleSeedChange} value={seed} />
              <button type='button' className='btn btn-light ms-2' onClick={handleRandomSeed}><img src={Random} width={20} height={20}/></button>
              <ExportCSVButton data={data} filename="exported_data.csv" />
            </div>
          </nav>
          <div className='w-100' style={{ marginTop: '10px'}}>
            <table className='table table-bordered table-striped table-hover'>
              <thead>
                <tr>
                    <th>#</th>
                    <th>Identifier</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                </tr>
              </thead>
                {data.map((val, index) => {
                    return (
                      <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td>{val.address}</td>
                            <td>{val.phone}</td>
                        </tr>
                      </tbody>
                    )
                })} 
            </table>
          </div>
        </div>
    )
}

export default Home