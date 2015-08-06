using Distributions
using JSON

mu = 0
sigma = 1
d = Normal( mu,sigma )

x = [ -5, -2.5, 0, 2.5, 5 ]

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	("mu", mu),
	("sigma", sigma),
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/partial.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
