export function SupportSection() {
  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8 vibrant-gradient">Support Koda Development</h2>
      <p className="text-vibrant-blue/80 mb-8 text-center font-raleway">
        Your collaboration to help the development of KODA will be welcome, everything raised helps KODAS conquer the
        world.
      </p>

      <div className="space-y-6">
        <div className="bg-black/50 border border-vibrant-blue/20 rounded-lg p-6">
          <h3 className="text-vibrant-blue font-bold mb-2 font-cinzel">USDT ERC20</h3>
          <div className="flex items-center gap-2 bg-black/30 p-3 rounded">
            <code className="text-sm text-vibrant-blue/80 flex-1 overflow-x-auto font-raleway">
              0x83917b016b5e01cc5436be36eca552433c75231c
            </code>
          </div>
        </div>

        <div className="bg-black/50 border border-vibrant-blue/20 rounded-lg p-6">
          <h3 className="text-vibrant-blue font-bold mb-2 font-cinzel">USDT TRC20</h3>
          <div className="flex items-center gap-2 bg-black/30 p-3 rounded">
            <code className="text-sm text-vibrant-blue/80 flex-1 overflow-x-auto font-raleway">
              TUF7N9ySJHDCtqMUR79qHGSmCKB3odzEUU
            </code>
          </div>
        </div>

        <div className="bg-black/50 border border-vibrant-blue/20 rounded-lg p-6">
          <h3 className="text-vibrant-blue font-bold mb-2 font-cinzel">KODA</h3>
          <div className="flex items-center gap-2 bg-black/30 p-3 rounded">
            <code className="text-sm text-vibrant-blue/80 flex-1 overflow-x-auto font-raleway">
              kobra:qpscc6kzu2ny8ga7tr72csftgxjnmzc0658355tgs9k45qpn0vm0qzlfenraj
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}
