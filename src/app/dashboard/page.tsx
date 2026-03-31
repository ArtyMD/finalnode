import { HeartbeatTimer } from "@/components/HeartbeatTimer";
import { Vault } from "@/components/Vault";
import { UserProfileMenu } from "@/components/UserProfileMenu";
import { BeneficiaryManager } from "@/components/BeneficiaryManager";

export default function Dashboard() {
    return (
        <div className="min-h-screen p-6 sm:p-12 relative overflow-hidden bg-[#0B1120]">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vh] bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vh] bg-brand-amber/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                <header className="flex items-center justify-between pb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-lg text-white shadow-lg">
                            F
                        </div>
                        <span className="text-xl font-medium tracking-wide text-white">FinalNode</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <BeneficiaryManager />
                        <UserProfileMenu />
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <HeartbeatTimer />
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <Vault />
                    </div>
                </main>
            </div>
        </div>
    );
}
