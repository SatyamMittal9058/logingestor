import {useState} from "react";
const Inputpage = () => {
    const [query, setQuery] = useState({
        level: '',
        message: '',
        resourceId: '',
        timestamp: '',
        traceId: '',
        spanId: '',
        commit: '',
        metadata: {
            parentResourceId: ''
        }
    });
    const [filterLog, setFilterLog] = useState([]);
    const handleChange = (e) => {

        if (e.target.name.includes("metadata.")) {
            const parentResourceId = e.target.name.split('.')[1];
            setQuery({
                ...query,
                metadata: {
                    ...query.metadata,
                    [parentResourceId]: e.target.value,
                },
            })
        }
        else {
            setQuery({ ...query, [e.target.name]: e.target.value });
        }
    }
    const handleSubmit = async (e) => {
        const res = await fetch('http://localhost:4000/logs', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const saveData = await res.json();
    }
    const handleSearch = async (e) => {
        const allLogs = await fetch('http://localhost:4000/search', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const searchData = await allLogs.json();
        setFilterLog(searchData);
    }
    //  useEffect(()=>{
    //  handleSearch();
    // },[]);

    return (
        <div>
            <div className="inputpage">
                <div className="form">
                    <h1>User Interface</h1>
                    <div>
                        <input placeholder="Enter level" text="text" name="level" value={query.level} onChange={handleChange} />
                    </div>
                    <div>
                        <input placeholder="Enter message" text="text" name="message" value={query.message} onChange={handleChange} />
                    </div>
                    <div>
                        <input text="text" placeholder="Enter resourceId" name="resourceId" value={query.resourceId} onChange={handleChange} />
                    </div>
                    <div>
                        <input text="text" placeholder="Enter timestamp" name="timestamp" value={query.timestamp} onChange={handleChange} />
                    </div>
                    <div>
                        <input text="text" placeholder="Enter traceId" name="traceId" value={query.traceId} onChange={handleChange} />
                    </div>
                    <div>
                        <input text="text" placeholder="Enter spanId" name="spanId" value={query.spanId} onChange={handleChange} />
                    </div>
                    <div>
                        <input text="text" placeholder="Enter commit" name="commit" value={query.commit} onChange={handleChange} />
                    </div>
                    <div>
                        <input text="text" placeholder="Enter metadata.parentResourceId" name="metadata.parentResourceId" value={query.metadata.parentResourceId} onChange={handleChange} />
                    </div>
                    <div className="btn-container">
                        <div> <button className="btn" onClick={handleSubmit}>Save</button> </div>
                        <div> <button className="btn" onClick={handleSearch}>Search</button> </div>
                    </div>
                </div>
            </div>
            <div className="output">
                <h1 className="heading">Search Result</h1>
                <ul>
                    {filterLog.map(log => (
                        <li key={log._id}>
                            <pre>{JSON.stringify(log,null,2)}</pre>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Inputpage;