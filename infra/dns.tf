/*
data "bunnynet_dns_zone" "dns" {
	domain = "we-evolve.co.uk"
}

resource "bunnynet_dns_record" "dns" {
	zone = data.bunnynet_dns_zone.dns.id

	name  = "clocks"
	type  = "CNAME"
	value = "${bunnynet_pullzone.cdn.name}.${bunnynet_pullzone.cdn.cdn_domain}"
}
*/