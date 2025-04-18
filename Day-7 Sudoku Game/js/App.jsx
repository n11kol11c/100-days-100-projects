import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ThemeContext = createContext();

const sampleData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 60 },
];

const useFilteredData = (data, filterValue) => {
  return useMemo(() => {
    if (!filterValue) return data;
    return data.filter(d => d.value >= parseInt(filterValue));
  }, [data, filterValue]);
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [filterValue, setFilterValue] = useState('');
  const [newEntry, setNewEntry] = useState({ name: '', value: '' });
  const filteredData = useFilteredData(data, filterValue);

  const handleAddData = () => {
    if (newEntry.name && newEntry.value) {
      setData(prev => [...prev, { ...newEntry, value: parseInt(newEntry.value) }]);
      setNewEntry({ name: '', value: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Filter by minimum value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              type="number"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Month"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <Input
                placeholder="Value"
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
              />
              <Button onClick={handleAddData}>Add</Button>
            </div>
          </div>
          <Chart data={filteredData} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        <div className="p-4">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;

