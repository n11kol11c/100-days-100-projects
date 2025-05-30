-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))
-- Complex Lua program: MetaTree with OOP, coroutines, metatables, environments, and more

-- Simulate OOP system
local Class = function(name, base)
    local cls = {}
    cls.__index = cls
    cls.__name = name
    cls.__type = "class"
    function cls:new(...)
        local obj = setmetatable({}, cls)
        if cls.init then cls.init(obj, ...) end
        return obj
    end
    if base then
        setmetatable(cls, { __index = base })
        cls.__base = base
    end
    return cls
end

-- Custom binary tree node with coroutine traversal and meta-behavior
local TreeNode = Class("TreeNode")
function TreeNode:init(value)
    self.value = value
    self.left = nil
    self.right = nil
end

function TreeNode:insert(val)
    if val < self.value then
        if not self.left then
            self.left = TreeNode:new(val)
        else
            self.left:insert(val)
        end
    else
        if not self.right then
            self.right = TreeNode:new(val)
        else
            self.right:insert(val)
        end
    end
end

function TreeNode:traverse_inorder()
    return coroutine.wrap(function()
        local function recurse(node)
            if not node then return end
            recurse(node.left)
            coroutine.yield(node.value)
            recurse(node.right)
        end
        recurse(self)
    end)
end

-- Metatable trickery to count accesses
setmetatable(TreeNode, {
    __call = function(_, ...)
        print("[TreeNode Constructor Called]")
        return TreeNode:new(...)
    end,
    __tostring = function()
        return "TreeNodeClass"
    end
})

-- Custom Environment Isolation
local function sandboxed_eval(code)
    local env = setmetatable({}, { __index = _G })
    local f = load(code, "sandbox", "t", env)
    return f and f() or nil
end

-- Graph traversal with continuation passing style
function TreeNode:map(func)
    local function mapper(node)
        if not node then return nil end
        local new = TreeNode:new(func(node.value))
        new.left = mapper(node.left)
        new.right = mapper(node.right)
        return new
    end
    return mapper(self)
end

-- Create a tree
local root = TreeNode(10)
for _, v in ipairs({5, 15, 3, 7, 12, 18}) do
    root:insert(v)
end

-- Coroutine traversal
print("In-order traversal:")
for val in root:traverse_inorder() do
    print(val)
end

-- Apply a map
local new_tree = root:map(function(x) return x * 2 end)
print("Mapped traversal (x2):")
for val in new_tree:traverse_inorder() do
    print(val)
end

-- Sandbox test
print("Sandboxed code result:")
print(sandboxed_eval("return math.sqrt(144) + 5"))

