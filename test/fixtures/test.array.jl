using Distributions
using JSON

mu = 0
sigma = 1
d = Normal( mu,sigma )

x = linspace( .5, -100, 100 )

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	("mu", mu),
	("sigma", sigma),
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/array.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
